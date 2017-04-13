import FileUpload from '../components/FileUpload';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  uploadFiles,
  selectFileToUpload
} from '../actions/UploadActions';

//Map state to props
function mapStateToProps(state) {
  return {
    uploadProgress: state.files.uploadProgress,
    fileListSelected: state.files.fileListSelected
  };
}

//Map dispatch actions and bind creators to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {uploadFiles,selectFileToUpload},
    dispatch
  );
}

//Connect module with Redux store
export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
