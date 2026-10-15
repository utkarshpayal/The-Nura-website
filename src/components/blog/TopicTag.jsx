import { Link } from 'react-router-dom';
import { topicMeta } from '../../lib/blog';

export default function TopicTag({ topic, link = false }) {
  const meta = topicMeta(topic);
  const style = { background: meta.tint, color: meta.color };
  if (link) {
    return (
      <Link to={`/blog/topic/${encodeURIComponent(topic)}`} className="topic-tag" style={style}>
        {meta.label}
      </Link>
    );
  }
  return (
    <span className="topic-tag" style={style}>
      {meta.label}
    </span>
  );
}
