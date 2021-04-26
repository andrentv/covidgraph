import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Slug.module.css';


export default function slug({ country }) {
    console.log(country)
    return (
        <div className={styles.container}>
            <Head>
                <title>{country.Country}</title>
                <link rel="icon" href={"https://flagcdn.com/" + country.CountryCode.toLowerCase() + ".svg"} alt={country.Country} />
            </Head>
            <div className={styles.banner}>
                <img href={"https://flagcdn.com/" + country.CountryCode.toLowerCase() + ".svg"} alt={country.Country + "banner"} />
            </div>  
            <div className={styles.content}>
                <div  className={styles.countryTitle}>
                    <Link href="/"><a>
                        <div className={styles.countryButton}>
                            <img src="./preview.svg" alt="back" />
                        </div>
                    </a></Link>
                {country.Country}
                </div>
                <div className={styles.twoContainers}>
                    <div className={styles.leftContainer}>
                        {/* map aqui */}
                        <p className={styles.countryCode}></p>
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
                    <div className={styles.rightContainer}>
                        {/* chart vai aqui? */}
                    </div>
                </div>
                </div>
            </div>  
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const res = await fetch('https://api.covid19api.com/summary');
    const data = await res.json();
    const country = await data.Countries.filter(country => country.Slug == params.slug);
    
    return {
        props: { country: country[0] }, // will be passed to the page component as props
    }
}