import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home({ data, countries }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Covid Infograph</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.headersInfo}>
        <p>Latest Update: {data.Date.split('T')[0]}</p>
        <p>Countries Currently Less Then 5000 Confirmed Infections: {countries.length}</p>
      </div>
      <div>
        <p className={styles.headersTitle}>Countries with Lowest Confirmed Covid Infections</p>
        <div className={styles.countriesWrapper}>
          {countries.map(country => {
          return (
            <Link key={country.ID} href={"/" + country.Slug}><a>
              <div className={styles.countryItem}>
                <img src={"https://flagcdn.com/" + country.CountryCode.toLowerCase() + ".svg"} alt={country.Country} />
                <p className={styles.countryTitle}>{country.Country} ({country.CountryCode})</p>
                <div className={styles.countryInfo}>
                  <spam className={styles.textInfo}>Confirmed <spam className={styles.numbersInfo}>{country.TotalConfirmed}</spam></spam>
                  <spam className={styles.textInfo}>Deaths <spam className={styles.numbersInfo}>{country.TotalDeaths}</spam></spam>
                  <spam className={styles.textInfo}>Recovered <spam className={styles.numbersInfo}>{country.TotalRecovered}</spam></spam>
                </div>
              </div>
            </a></Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch('https://api.covid19api.com/summary');
  const data = await res.json();
  const countries = await data.Countries.filter(country => country.TotalConfirmed < 5000);
  countries.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed) ? 1 : -1)
    return {
    props: { data, countries }, // will be passed to the page component as props
  }
}