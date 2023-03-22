import styles from '@/styles/Card.module.css';
import { setDefaultImageOnError, setNewsDataToLS, getImageDefaultURL } from '../utility/commonUtility';
import { useRouter } from 'next/router';
type CardProps = {
    title: string;
    description: string;
    image: string;
    author: string;
    content: string;
    url: string;
    publishedAt: string;
    src: string;
}

function Card(props: CardProps) {
    const { title, description, image, author, content, url, src, publishedAt } = props;
    const router = useRouter();

    const cardClicked = () => {
        const imageUrl = getImageDefaultURL(image, 'square');
        setNewsDataToLS({ title, content, author, url, imageUrl, src, publishedAt, description });
        router.push('/news');
    }
    return (
        <>
            <div className={`card ${styles.card}`} onClick={() => cardClicked()}>
                <div className={`img-container ${styles.imgContainer}`}>
                    <img
                        src={image}
                        className="card-img-top"
                        alt={title}
                        onError={(event: any) => setDefaultImageOnError(event, 'square')}
                    />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text"> {description} </p>
                    <p className="card-text"><small className="text-muted">- {author}</small></p>
                </div>
            </div>
        </>
    );
}

export default Card;