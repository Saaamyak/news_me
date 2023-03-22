import styles from '@/styles/CategoryCards.module.css';
import Card from './Card';
import Spinner from 'react-bootstrap/Spinner';
import { getImageURL, getAuthor } from '../utility/commonUtility';

type CategoryCardsProps = {
    category: string;
    data: any;
    isLoading: boolean;
}
function renderLoader(isLoading: boolean) {
    return (isLoading &&
        <div className={styles.spinner}>
            <Spinner variant='primary' animation="border" role="status" />
        </div>
    );
}
function renderCards(isLoading: boolean, data: any) {
    return !isLoading && data && data.articles && data.articles.length > 0 && (
        <div className={`card-deck ${styles.cards}`}>
            {data && data.articles && data.articles.map((item: any, index: number) => {
                return (
                    <Card
                        key={`categoryCard_${index}`}
                        title={item.title}
                        description={item.description}
                        image={getImageURL(item.urlToImage, 'square')}
                        author={getAuthor(item.author, item.source.name)}
                        content={item.content}
                        url={item.url}
                        publishedAt={item.publishedAt}
                        src={item.source.name}
                    />
                )
            })}
        </div>
    )
}
export default function categoryCards(props: CategoryCardsProps) {
    const { category, data, isLoading } = props;
    return (
        <div className={styles.categoryCards}>
            {renderLoader(isLoading)}
            {renderCards(isLoading, data)}
        </div>
    )
}