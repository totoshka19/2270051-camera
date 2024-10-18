import { ERROR_MESSAGE, LOADING_MESSAGE } from '../conts';

type SpinnerProps = {
  loading: boolean;
  error: boolean;
};

function Spinner({loading, error}: SpinnerProps) {
  return (
    <main>
      <div className="page-content">
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">
              {loading && LOADING_MESSAGE}
              {error && !loading && ERROR_MESSAGE}
            </h1>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Spinner;
