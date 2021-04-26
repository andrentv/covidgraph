import React from 'react';
import LineChart from '../components/LineChart';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Slug.module.css';

const Map = dynamic(
  () => import('../components/Map'),{
  loading: () => <p>A map is loading.</p>,
  ssr: false }
);

export default function slug({ country, countryMonth }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{country.Country}</title>
                <link rel="icon" href={"https://flagcdn.com/" + country.CountryCode.toLowerCase() + ".svg"} alt={country.Country} />
            </Head>
            <div className={styles.banner}>
                <img src={"https://flagcdn.com/" + country.CountryCode.toLowerCase() + ".svg"} alt={country.Country + "banner"} />
            </div>
            <div className={styles.contents}>
                <div className={styles.countryTitle}>                   
                    {country.Country}
                </div>
                <div className={styles.twoContainers}>
                    <div className={styles.leftContainer}>
                        <Map countryMonth={countryMonth[0]} />
                        <p className={styles.countryCode}>Statistics</p>
                        <div className={styles.newTotal}>
                            <div>
                                <p>New Confirmed: <span>{country.NewConfirmed}</span></p>
                                <p>New Deaths: <span>{country.NewDeaths}</span></p>
                                <p>New Recovered: <span>{country.NewRecovered}</span></p>
                            </div>
                            <div>
                                <p>Total Confirmed: <span>{country.TotalConfirmed}</span></p>
                                <p>Total Deaths: <span>{country.TotalDeaths}</span></p>
                                <p>Total Recovered: <span>{country.TotalRecovered}</span></p>
                            </div>
                        </div>                      
                    </div>
                    <div className={styles.rightContainer}>
                        <LineChart countryMonth={countryMonth}/>
                    </div>
                </div>
            </div>
            <div className={styles.backPage}>
                <Link href="/"><a>
                    <div className={styles.backButton}>
                        <img src="./preview.svg" alt="back" />
                    </div>
                </a></Link>
            </div>           
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const res = await fetch('https://api.covid19api.com/summary');
    const data = await res.json();
    const country = await data.Countries.filter(country => country.Slug == params.slug);
    let previousMonth = new Date(data.Date.split('T')[0]);
    previousMonth.setMonth(previousMonth.getMonth() -1);
    previousMonth =JSON.stringify(previousMonth).split('T')[0].replace('"','');
    
    const res1 = await fetch(`https://api.covid19api.com/country/${params.slug}/status/confirmed?from=${previousMonth}T00:00:00Z&to=${data.Date.split('T')[0]}T00:00:00Z`);
    const countryMonth = await res1.json();
    return {
        props: { country: country[0], countryMonth }, // will be passed to the page component as props
    }
}
// 