import { useState } from 'react';
import styles from './RegisterUser.module.css';

function RegisterUser() {
   const [user, setUser] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call function to save user data on the blockchain
    saveUserDataOnBlockchain(user);
  };
  
  return (
  <form className={styles.container}>
          <button  className={styles.backButton}>Back</button> 
     <div className={styles.header}>
        <div className={styles.title}>REGISTER USER</div>
        <div className={styles.description}>
          Enter your name and email address to receive updates on your activities.
        </div>
      </div>
      
      <div className={styles.form}>
        <div className={styles.row}>
          <div className={styles.input}>
            <label className={styles.label} htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className={styles.inputField}
              placeholder="Enter your first name"
            />
          </div>
          
          <div className={styles.input}>
            <label className={styles.label} htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className={styles.inputField}
              placeholder="Enter your last name"
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.input}>
            <label  className={styles.label} htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={styles.inputField}
              placeholder="Enter your email address"
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.input}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.inputField}
              placeholder="Enter your password"
            />
          </div>
          <div className={styles.input}>
            <label className={styles.label} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={styles.inputField}
              placeholder="Confirm your password"
            />
          </div>
        </div>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            id="termsCheckbox"
            className={styles.checkboxIcon}
          />
          <label htmlFor="termsCheckbox" className={styles.checkboxText}>
            I have read terms and conditions and terms of clients and I agree with the terms.
          </label>
        </div>
        <button type="submit" className={styles.submitButton}>
          Continue To Register
        </button>
      </div>
  
     </form>
  );
}

export default RegisterUser;
