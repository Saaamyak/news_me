import Carousel from 'react-bootstrap/Carousel';
import styles from '@/styles/ItemCarousel.module.css';
import { getAuthor, getImageURL, setDefaultImageOnError, setNewsDataToLS, getImageDefaultURL } from '../../utility/commonUtility';
import { useRouter } from 'next/router';

const getCarausel = (ItemCarouselData: any, sendToLocalStorage: Function) => {
  return ItemCarouselData.map((item: any, index: number) => {
    return (
      <Carousel.Item key={`newsCarausel_${index}`} onClick={()=>sendToLocalStorage(item)}>
        <img
          className={`d-block w-100 ${styles.carouselImage}`}
          src={getImageURL(item.urlToImage, 'land')}
          alt={item.title}
          onError={(event: any) => setDefaultImageOnError(event, 'land')}
        />
        <Carousel.Caption>
          <h3>{item.title}</h3>
          <p>{getAuthor(item.author, item.source.name)}</p>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });
}
export default function ItemCarousel(props: any) {
  const router = useRouter();
  const sendToLocalStorage = (item: any) => {
    setNewsDataToLS({
      title: item.title,
      content: item.content,
      author: getAuthor(item.author, item.source.name),
      url: item.url,
      imageUrl: getImageDefaultURL(item.urlToImage, 'land'), 
      src: item.source.name, 
      publishedAt: item.publishedAt,
      description: item.description
    });
    router.push('/news');
  }
  return (
    <Carousel className={styles.carouselContainer}>
      {props.data && props.data.articles && getCarausel(props.data.articles, sendToLocalStorage)}
    </Carousel>
  );
}

