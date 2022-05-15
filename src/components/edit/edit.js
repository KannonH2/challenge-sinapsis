import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { openDefaultEditor } from "../pintura/pintura";
import { useNavigate } from "react-router-dom";
import "../pintura/pintura.css";
import styles from "../../styles/edit.module.css";
import JsFileDownloader from "js-file-downloader";

const editImage = (image, done) => {
  const imageFile = image.pintura ? image.pintura.file : image;
  const imageState = image.pintura ? image.pintura.data : {};

  const editor = openDefaultEditor({
    src: imageFile,
    imageState,
  });

  editor.on("close", () => {
    const output = editor.output();
    done(output);
  });

  editor.on("process", ({ dest, imageState }) => {
    Object.assign(dest, {
      pintura: { file: imageFile, data: imageState },
    });
    done(dest);
  });
};

function Edit() {
  const { user, isLoading, logout, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const path = useSelector((state) => state.thumbnail.path);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    setFiles([path]);
  }, [path]);

  const thumbs = files.map((file, index) => (
    <div key={file.name}>
      <button
        className={styles.editButton}
        onClick={() =>
          editImage(file, (output) => {
            const updatedFiles = [...files];
            updatedFiles[index] = output;
            if (file.preview) URL.revokeObjectURL(file.preview);
            Object.assign(output, {
              preview: URL.createObjectURL(output),
            });
            setFiles(updatedFiles);
          })
        }
      >
        Edit
      </button>
    </div>
  ));

  const download = () => {
    new JsFileDownloader({
      url: files[0]?.preview ? files[0].preview : path,
      nameCallback: function (name) {
        return name + ".jpg";
      },
    });
  };

  /*eslint-disable */
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

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
    <section className={styles.editorContainer}>
      <a className={styles.homeButton} href={`/home`}>
        {" "}
        Home{" "}
      </a>
      <div className={styles.logoutButtonContainer}>
        <button className={styles.logoutButton} onClick={() => logout()}>
          Logout
        </button>
      </div>
      {files[0]?.preview ? (
        <img
          className={styles.finalFile}
          src={files[0].preview}
          alt="preview"
        ></img>
      ) : (
        <img className={styles.finalFile} alt="preview" src={path}></img>
      )}
      <div className={styles.buttons}>
        <aside>{thumbs}</aside>
        <button className={styles.downloadButton} onClick={download}>
          Download
        </button>
      </div>
    </section>
  );
}

export default Edit;
