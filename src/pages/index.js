import { PureComponent } from 'react';
import styles from './index.css';
import { connect } from 'dva';
import fooModel from '../models/foo';

const { namespace, acTyp } = fooModel;

const mapStateToProps = (state) => {
  const { dogImgURL } = state[namespace];
  return { dogImgURL };
};

const mpaDispatchToProps = (dispatch) => {
  return {
    onClickFetchImg() {
      return dispatch({ type: `${namespace}/${acTyp.fetch_dogImg}` });
    },
  };
};

@connect(mapStateToProps, mpaDispatchToProps)
export default class IndexPage extends PureComponent {
  render() {
    return (
      <div>
        <div className={styles.normal}>
          <h1>Show random dog picture</h1>
        </div>
        <div>
          <img src={this.props.dogImgURL} alt="dog image" height="300" />
        </div>
        <div style={{ marginTop: '16px' }}>
          <button onClick={this.props.onClickFetchImg}>点击获取图片</button>
        </div>
      </div>
    );
  }
}
