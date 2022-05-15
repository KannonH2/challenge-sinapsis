import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import DropZone from "../dropzone/dropzone";
import styles from "../../styles/home.module.css";

export default function Home() {
  const navigate = useNavigate();
  const { user, isLoading, logout, isAuthenticated } = useAuth0();

  /*eslint-disable */
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button className={styles.logoutButton} onClick={() => logout()}>
          Logout
        </button>
      </div>
      <div className={styles.dropzoneBox}>
        <h1>Thumbnail Generator</h1>
        <div>
          <DropZone />
        </div>
        <h2>How it works?</h2>
        <p className={styles.text}>
          - Upload your file (video .mp4 or image .jpg/.png).
        </p>
        <p className={styles.text}>- After upload an image, you can edit it.</p>
        <p className={styles.text}>
          - If you upload a video, the app processes the video and return an
          image, after that, you can edit the returned image.{" "}
        </p>
      </div>
    </div>
  );
}
