import Head from 'next/head'
import styles from '@/styles/News.module.css';
import Header from './component/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getNewsDataFromLS, setDefaultImageOnError, getImageURL } from './utility/commonUtility';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function News({ datas } : any) {
    const router = useRouter();
    let data = {
        title: '',
        author: '',
        publishedAt: '',
        imageUrl: '',
        description: '',
        content: '',
        url: '',
        src: ''
    };

    const [newsData, setNewsData] = useState<string>('');

    const getReadableDate = (date: string) => {
        if(typeof window === 'undefined') return '';
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString(
            window.navigator.language,
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
        ) + ' ' + dateObj.toLocaleTimeString(
            window.navigator.language,
            {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }
        );
    }

    const setContentFromFetch = async (url: string) => {
        await fetch('/api/news?url='+url)
            .then(res => res.json())
            .then((res) => {
                data = res;
                console.log(res);
                setNewsData(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    if (typeof window !== 'undefined') {
        const newsData = getNewsDataFromLS();
        if (newsData) {
            data = newsData;
            setContentFromFetch(data.url);
        }
    }

    return (
        <>
            <Head>
                <title>{data.title || 'News ME'}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Header />
                <div className={styles.newsContainer}>
                    <Link className={`${styles.backButton} btn btn-primary`} href={"/"}>&larr; Back</Link>
                    <h1 className={styles.title}>{data.title}</h1>
                    <span className={styles.author}>By: {data.author}</span>
                    <span className={styles.publishedAt}>Published At: {getReadableDate(data.publishedAt)}</span>
                    <img
                        className={`d-block mt-5 mb-5 ${styles.newsImg}`}
                        src={getImageURL(data.imageUrl, 'land')}
                        alt={data.title}
                        onError={(event: any) => setDefaultImageOnError(event, 'land')}
                    />
                    <p className={styles.description}>{data.description}</p>
                    <p className={styles.content}>{newsData || data.content}</p>
                    <span className={styles.original}>Original Article: <a href={data.url} target="_blank">{data.src}</a></span>
                </div>
            </main>
        </>
    )
}