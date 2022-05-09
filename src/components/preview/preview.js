import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { setLoading } from "../../redux/actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/preview.module.css";

export default function Prev() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prev = useSelector((state) => state.thumbnail);
  const isLoad = useSelector((state) => state.loading);
  const { user, isLoading, logout, isAuthenticated } = useAuth0();

  const edit = () => {
    navigate("/edit");
  };

  /*eslint-disable*/
  useEffect(() => {
    if (prev.path.length > 0) {
      dispatch(setLoading(false));
    }
  }, [prev]);

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
  /*eslint-enable*/

  return (
    <div className={styles.mainContainer}>
      <div className={styles.prev}>
        <a className={styles.homeButton} href={`/home`}>
          Home
        </a>
        <button className={styles.logoutButton} onClick={() => logout()}>
          Logout
        </button>
      </div>
      <div className={styles.prevContainer}>
        {prev.path.length === 0 && isLoad ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
          </div>
        ) : prev.path.length === 0 ? (
          <div>There's no Images Uploaded</div>
        ) : (
          <>
            <div className={styles.edit}>
              <h2>Your file was uploaded sucessfully</h2>
              <h3 className={styles.URL}>
                URL:{" "}
                <a
                  className={styles.link}
                  href={prev.path}
                  rel="noreferrer"
                  target="_blank"
                >
                  {prev.path}
                </a>
              </h3>
              <button
                onClick={() => edit()}
                className={styles.ovBtnSlideClose}
                id="from-center"
              >
                Continue
              </button>
            </div>
            <div className={styles.imgContainer}>
              <img
                src={prev.path}
                alt="preview"
                className={styles.imgPreview}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
