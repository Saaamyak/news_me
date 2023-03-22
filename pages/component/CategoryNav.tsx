import Nav from 'react-bootstrap/Nav';
import styles from '@/styles/CategoryNav.module.css';

type categoryNavProps = {
    onSelect: (selectedKey: string|null) => void;
    activeKey: number;
    categories: string[];
}


export default function CategoryNav(props: categoryNavProps) {
  const categories: string[] = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];
  function getNavItems(categories: string[]) {
    return categories.map((category: string, index: number) => {
      return (
        <Nav.Item key={`categoryNav_${index}`} >
          <Nav.Link eventKey={`link-${index}`}>{category}</Nav.Link>
        </Nav.Item>
      );
    });
  }
  return (
    <Nav className={styles.categoryNav} fill variant="tabs" defaultActiveKey={`link-${props.activeKey}`} onSelect={props.onSelect}>
        {getNavItems(categories)}
    </Nav>
  );
}