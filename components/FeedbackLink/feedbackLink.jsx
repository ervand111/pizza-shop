import styles from 'styles/feedback.module.css';

function FeedbackLink() {
  return (
    <div className={styles.yandexWidget}>
      <iframe
        src="https://yandex.ru/sprav/widget/rating-badge/10683179978?type=rating"
        width="150"
        height="50"
        style={{ border: 'none', overflow: 'hidden' }}
        allowFullScreen={true}
        title="Yandex Rating Badge"
      ></iframe>
    </div>
  );
}

export default FeedbackLink;
