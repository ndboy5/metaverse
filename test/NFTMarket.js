const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket Contract", function () {
  let NFTMarket;
  let nftMarket;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    NFTMarket = await ethers.getContractFactory("NFTMarket");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    nftMarket = await NFTMarket.deploy();
    await nftMarket.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await nftMarket.owner()).to.equal(owner.address);
    });

    it("Should assign the admin role to the deployer", async function () {
      const adminRole = await nftMarket.ADMIN_ROLE();
      expect(await nftMarket.hasRole(adminRole, owner.address)).to.be.true;
    });
  });

  describe("User Profiles", function () {
    it("Should allow a user to set their profile", async function () {
      const testProfile = {
        firstnameHash: ethers.utils.formatBytes32String("John"),
        lastnameHash: ethers.utils.formatBytes32String("Doe"),
        emailHash: ethers.utils.formatBytes32String("johndoe@example.com"),
        passwordHash: ethers.utils.formatBytes32String("password123"),
        addressHash: ethers.utils.formatBytes32String("123 Main St"),
      };

      await nftMarket
        .connect(addr1)
        .setUserProfile(
          testProfile.firstnameHash,
          testProfile.lastnameHash,
          testProfile.emailHash,
          testProfile.passwordHash,
          testProfile.addressHash
        );

      const userProfile = await nftMarket
        .connect(addr1)
        .getUserProfile(addr1.address);
      expect(userProfile).to.deep.equal(testProfile);
    });

    it("Should only allow admin to access all user profiles", async function () {
      await expect(
        nftMarket.connect(addr1).getAllUserProfiles()
      ).to.be.revertedWith("Caller is not an admin");
    });
  });

  describe("Admin Role Management", function () {
    it("Should allow default admin to add a new admin", async function () {
      await nftMarket.connect(owner).addAdmin(addr1.address);
      expect(
        await nftMarket.hasRole(await nftMarket.ADMIN_ROLE(), addr1.address)
      ).to.be.true;
    });

    it("Should prevent non-default admins from adding a new admin", async function () {
      await expect(
        nftMarket.connect(addr1).addAdmin(addr2.address)
      ).to.be.revertedWith("Caller is not a default admin");
    });

    it("Should allow default admin to revoke an admin", async function () {
      await nftMarket.connect(owner).addAdmin(addr1.address);
      await nftMarket.connect(owner).revokeAdmin(addr1.address);
      expect(
        await nftMarket.hasRole(await nftMarket.ADMIN_ROLE(), addr1.address)
      ).to.be.false;
    });
  });

  describe("Selling Items", function () {
    let nftContract;
    let uri = "testURI";
    let price = ethers.utils.parseEther("0.1");

    beforeEach(async function () {
      const NFT = await ethers.getContractFactory("NFT");
      nftContract = await NFT.deploy();
      await nftContract.deployed();
    });

    it("Should let a user sell an item", async function () {
      const tokenId = await nftContract
        .connect(addr1)
        .safeMint(uri, nftMarket.address, addr1.address);
      await nftMarket
        .connect(addr1)
        .sellItem(uri, price, nftContract.address, { value: mintingCost });

      const item = await nftMarket.Items(tokenId);
      expect(item.owner).to.equal(nftMarket.address);
      expect(item.creator).to.equal(addr1.address);
      expect(item.price).to.equal(price);
    });
  });

  describe("Fetching Items", function () {
    let nftContract;
    let uri = "testURI";
    let price = ethers.utils.parseEther("0.1");

    beforeEach(async function () {
      const NFT = await ethers.getContractFactory("NFT");
      nftContract = await NFT.deploy();
      await nftContract.deployed();

      // List multiple items for sale
      await nftContract
        .connect(addr1)
        .safeMint(uri, nftMarket.address, addr1.address);
      await nftMarket
        .connect(addr1)
        .sellItem(uri, price, nftContract.address, { value: mintingCost });

      await nftContract
        .connect(addr2)
        .safeMint(uri, nftMarket.address, addr2.address);
      await nftMarket
        .connect(addr2)
        .sellItem(uri, price, nftContract.address, { value: mintingCost });
    });

    it("Should fetch market items correctly", async function () {
      const items = await nftMarket.fetchMarketItems();
      expect(items.length).to.equal(2);

      // Asserting details of the first item
      expect(items[0].owner).to.equal(nftMarket.address);
      expect(items[0].creator).to.equal(addr1.address);
      expect(items[0].price).to.equal(price);

      // Asserting details of the second item
      expect(items[1].owner).to.equal(nftMarket.address);
      expect(items[1].creator).to.equal(addr2.address);
      expect(items[1].price).to.equal(price);
    });
  });

  describe("Pause and Unpause Functionality", function () {
    it("Should allow the owner to pause and unpause the contract", async function () {
      await nftMarket.connect(owner).pause();
      expect(await nftMarket.isPaused()).to.be.true;

      await nftMarket.connect(owner).unPause();
      expect(await nftMarket.isPaused()).to.be.false;
    });

    it("Should prevent non-owners from pausing the contract", async function () {
      await expect(nftMarket.connect(addr1).pause()).to.be.revertedWith(
        "Only owner can call this function"
      );
    });
  });
});
