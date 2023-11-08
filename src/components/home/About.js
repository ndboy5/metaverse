import styles from './About.module.css';

function About() {
  return (
    <div className={`bg-custom ${styles.container}`}>
    
        <div className="text-center text-green-200 pt-8 text-3xl font-black font-['Termina Test']">Who We Are</div>
          <div className={`flex justify-center items-center border-sky`}>
          <div className={`w-96  text-white text-sm font-medium p-5 ${styles.about}`}>
    Our mission is to empower people around, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. <br/><br/>Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend.<br/><br/>
<img className={` ${styles.img1}`} src="./images/shopLogo2.png" alt="" />
  </div>

    </div>
      <br />
  
    <div className={` h-14 justify-between items-start inline-flex ${styles.container2}`}>
      <div className={`px-6 py-4 bg-fuchsia-400 rounded-3xl justify-center items-center gap-1 flex ${styles.popular}`}>
        <div className="text-center text-black text-xl font-semibold font-['Neue Haas Grotesk Display Pro']">Popular</div>
      </div>
      <div className={`px-6 py-4 bg-zinc-900 rounded-3xl border border-zinc-800 justify-center items-center gap-1 flex ${styles.space}`}>
        <div className="text-center text-stone-300 text-xl font-medium font-['Neue Haas Grotesk Display Pro']">Space</div>
      </div>
    
      <div className={`px-6 py-4 bg-zinc-900 rounded-3xl border border-zinc-800 justify-center items-center gap-1 flex ${styles.gaming}`}>
        <div className="text-center text-stone-300 text-xl font-medium font-['Neue Haas Grotesk Display Pro']">Gaming</div>
      </div>
      <div className={`px-6 py-4 bg-zinc-900 rounded-3xl border border-zinc-800 justify-center items-center gap-1 flex ${styles.nature}`}>
        <div className="text-center text-stone-300 text-xl font-medium font-['Neue Haas Grotesk Display Pro']">Nature</div>
      </div>
      <div className={`px-6 py-4 bg-zinc-900 rounded-3xl border border-zinc-800 justify-center items-center gap-1 flex ${styles.music}`}>
        <div className="text-center text-stone-300 text-xl font-medium font-['Neue Haas Grotesk Display Pro']">Music</div>
      </div>
      <div className={`px-6 py-4 bg-zinc-900 rounded-3xl border border-zinc-800 justify-center items-center gap-1 flex ${styles.entertainment}`}>
        <div className="text-center text-stone-300 text-xl font-medium font-['Neue Haas Grotesk Display Pro']">Entertainment</div>
      </div>
      <div className={`px-6 py-4 bg-zinc-900 rounded-3xl border border-zinc-800 justify-center items-center gap-1 flex ${styles.gallery}`}>
        <div className="text-center text-stone-300 text-xl font-medium font-['Neue Haas Grotesk Display Pro']">Gallery</div>
      </div>
    </div>
  
    <div className={` ${styles.background}`}>
  <img className={` ${styles.img2}`} src="./images/pics-2.jpg" alt="" />
  <div className={`w-96  text-white text-sm font-medium p-5`}>
    Our mission is to empower people around, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. <br/><br/>Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend.<br/><br/>

  </div>
  </div>

    </div>
    
  );
}

export default About;
