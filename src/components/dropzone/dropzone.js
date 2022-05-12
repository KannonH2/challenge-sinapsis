import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiUpload } from "react-icons/fi";
import styles from "../../styles/home.module.css";

import {
  sendVideo,
  sendImage,
  setLoading,
  resetState,
} from "../../redux/actions";

export default function DropZone() {
  const navigate = useNavigate();
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

  /*eslint-enable */
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
