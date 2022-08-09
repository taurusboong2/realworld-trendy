import React, { useEffect } from 'react';
import Layout from '@/components/common/Layout';
import MyLink from '@/components/common/MyLink';
import { useNavigate, useParams } from 'react-router';
import { notice } from '@/constants/noticeFeeds';

const Notice = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug !== notice.slug) {
      navigate('/');
    }
  }, []);

  return (
    <Layout>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{notice.title}</h1>

            <div className="article-meta">
              <MyLink href="/*">
                <img src={notice.image} />
              </MyLink>
              <div className="info">
                <MyLink href="/*" className="author">
                  {notice.author}
                </MyLink>
                <span className="date">{notice.date}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p style={{ whiteSpace: 'pre-line' }}>{notice.body}</p>
              <hr />
              <span className="description">description</span>
              <p className="article-detail-description">{notice.description}</p>
            </div>
          </div>
          <hr />

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notice;
