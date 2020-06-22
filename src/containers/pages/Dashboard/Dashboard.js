import React, { Component, Fragment } from "react";
import "./Dashboard.scss";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataFromAPI,
  deleteDataFromAPI,
} from "../../../config/redux/action";
import { connect } from "react-redux";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textButton: "Simpan",
    noteId: "",
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.props.getNotes(userData.user.uid);
  }

  handleChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  handleSave = () => {
    const { title, content, textButton } = this.state;
    const { saveNotes, updateNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.user.uid,
    };
    if (textButton === "Simpan") {
      saveNotes(data);
    } else {
      data.noteId = this.state.noteId;
      updateNotes(data);
    }
  };

  updateNotes = (note) => {
    console.log(note);
    this.setState({
      title: note.data.title,
      content: note.data.content,
      textButton: "Update",
      noteId: note.id,
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      textButton: "Simpan",
    });
  };

  deleteNote = (e, note) => {
    e.stopPropagation();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      userId: userData.user.uid,
      noteId: note.id,
    };
    this.props.deleteNotes(data);
  };

  render() {
    const { notes } = this.props;
    const { title, content } = this.state;
    return (
      <div className="container">
        <div className="form-input">
          <input
            type="text"
            className="input-title"
            placeholder="title"
            id="title"
            value={title}
            onChange={(e) => this.handleChange(e, "title")}
          />
          <textarea
            onChange={(e) => this.handleChange(e, "content")}
            className="input-content"
            name="content"
            id="content"
            cols="30"
            rows="10"
            placeholder="content"
            value={content}
          ></textarea>
          <div className="action-wrapper">
            {this.state.textButton === "Update" ? (
              <button className="save-btn cancel" onClick={this.cancelUpdate}>
                Cancel
              </button>
            ) : (
              <div />
            )}
            <button className="save-btn" onClick={this.handleSave}>
              {this.state.textButton}
            </button>
          </div>
        </div>
        <hr />
        {notes.length > 0 ? (
          <Fragment>
            {notes.map((note) => {
              return (
                <div
                  className="card-content"
                  key={note.id}
                  onClick={() => this.updateNotes(note)}
                >
                  <p className="title">{note.data.title}</p>
                  <p className="date">{note.data.date}</p>
                  <p className="content">{note.data.content}</p>
                  <div
                    className="btn-del"
                    onClick={(e) => this.deleteNote(e, note)}
                  >
                    X
                  </div>
                </div>
              );
            })}
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDataFromAPI(data)),
  updateNotes: (data) => dispatch(updateDataFromAPI(data)),
  deleteNotes: (data) => dispatch(deleteDataFromAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
