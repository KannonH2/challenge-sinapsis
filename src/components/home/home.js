import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FiUpload } from "react-icons/fi";
import styles from "../../styles/home.module.css";

import {
  sendVideo,
  sendImage,
  setLoading,
  resetState,
} from "../../redux/actions";

export default function Home() {
  const navigate = useNavigate();
  const { user, isLoading, logout, isAuthenticated } = useAuth0();

  function Previews() {
    const dispatch = useDispatch();

    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*, video/*",
      noKeyboard: true,
      multiple: false,
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

    const thumbs = () => {
      if (files[0]?.preview.length > 0) {
        const prev = files[0];
        if (prev?.type.includes("image")) {
          const data = new FormData();
          data.append("file", prev);
          dispatch(sendImage({ data: data, file: prev.name }));
          setFiles([]);
          dispatch(setLoading(true));
          navigate("/preview");
        } else {
          const data = new FormData();
          data.append("file", prev);
          dispatch(sendVideo(data));
          setFiles([]);
          dispatch(setLoading(true));
          navigate("/preview");
        }
      }
    };

    /*eslint-disable */
    useEffect(() => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    useEffect(() => {
      dispatch(setLoading(false));
      dispatch(resetState());
    }, []);
    /*eslint-enable */

    return (
      <section className={styles.dropzone}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p className={styles.dropzoneText}>
            Drop your file here or click to select
          </p>
          <FiUpload />
        </div>
        <aside>{thumbs()}</aside>
      </section>
    );
  }

  /*eslint-disable */
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/");
    }
  }, []);
  /*eslint-enable */

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button className={styles.logoutButton} onClick={() => logout()}>
          Logout
        </button>
      </div>
      <div className={styles.dropzoneBox}>
        <h1>Thumbnail Generator</h1>
        <div>{Previews()}</div>
        <h2>How it works?</h2>
        <p className={styles.text}>
          - Upload your file (video .mp4 or image .jpg/.png).
        </p>
        <p className={styles.text}>
          - After upload an image, you can edit it.
        </p>
        <p className={styles.text}>
          - If you upload a video, the app processes the video and return an
          image, after that, you can edit the image returned.{" "}
        </p>
      </div>
    </div>
  );
}
