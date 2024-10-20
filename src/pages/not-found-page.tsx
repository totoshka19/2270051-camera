import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';

function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Страница не найдена - Фотошоп</title>
      </Helmet>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }}>
        <Layout>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 className="title title--h2" style={{ marginBottom: '30px' }}>Страница не найдена</h1>
            <Link className="btn btn--purple" to="/">Вернуться на главную страницу</Link>
          </div>
        </Layout>
      </div>

    </>
  );
}

export default NotFoundPage;
