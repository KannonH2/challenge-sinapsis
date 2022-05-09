import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/landing.module.css";

export default function Landing() {
  const navigate = useNavigate();
  const { loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    if (user?.email) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className={styles.landing}>
      <div className={styles.landingContainer}>
        <h1>Thumbnail Generator</h1>
        <p className={styles.paragraph}>
          This is a simple web app that generates thumbnails for images. It
          uses the{" "}
          <a href="https://www.npmjs.com/package/multer" target="_blank" rel="noreferrer">
            multer
          </a>{" "}
          library to upload the images.
        </p>
        <button
          onClick={() => loginWithRedirect()}
          className={styles.button}
        >
          Login
        </button>
      </div>
    </div>
  );
}
