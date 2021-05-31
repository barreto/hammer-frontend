import style from './style.module.scss';

export default function Logo() {
  return (
    <div className={style.loginContainer}>
      <img src="/hammer.svg" alt="Logo Hammer" style={{ width: "48px" }} />
      <h1 style={{ fontSize: "24px" }}>Hammer</h1>
    </div>
  );
}
