import styles from './header.module.css'
import car  from '/src/assets/img/car.svg'


function Headparking() {
    return (
      <header className={styles.header}>
        <img src="{car}"/>
        <h1 className={styles.title}>Parking app</h1>
        <nav>
          <ul className={styles.listh}>
            <li><a href="#">Parking app</a></li>
            <li><a href="#">Apartar</a></li>
            <li><a href="#">Parking services</a></li>
            <li><a href="#">Más info</a></li>
          </ul>
        </nav>
      </header>
    )
  }
  
  export default Headparking