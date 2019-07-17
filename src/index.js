import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faPlus, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import './index.css';

library.add(faTimes, faPlus, faEllipsisH)


class TitleNote extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            displayDropDown: false,
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.dropdown = this.dropdown.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    handleTitleChange(e) {
        this.props.onTitleChange(e.target.value);
    }
    handleRemoveNote() {
        this.props.onRemoveNoteClick()
    }

    dropdown() {
        this.setState({
            displayDropDown: !this.state.displayDropDown,
        })
    }

    changeColor(e) {
        this.props.onColorChange(e.target.dataset.color)
    }

    render() {
        const title = this.props.title;
        const dropDownClass = 'option' + (this.state.displayDropDown ? '-display ' : '');
        const displayNone = (this.state.displayDropDown ? 'option-display-none ' : '');

        var titleColor = '';
        switch (this.props.color) {
            case 'red':
                titleColor = 'option-red-title'
                break;
            case 'green':
                titleColor = 'option-green-title'
                break;
            case 'purple':
                titleColor = 'option-purple-title'
                break;
            case 'gray':
                titleColor = 'option-gray-title'
                break;
            default:
                titleColor = 'option-blue-title'
                break;
        }
        return (
            <div className={'note-title-container ' + titleColor}>
                <input className={'note-title ' + titleColor} value={title} onChange={this.handleTitleChange} />
                <div className="note-toolbar">
                    <p className={'note-date ' + displayNone}> {this.props.date} </p>
                    <div className="select">
                        <ul className="closed note-toolbar-options" id="selectbox" onClick={this.dropdown}>
                            <li className={displayNone}>
                                <FontAwesomeIcon className={displayNone} icon="ellipsis-h" />
                            </li>
                            <li data-color="blue"
                                className={'option-blue-title ' + dropDownClass}
                                onClick={this.changeColor}>
                            </li>
                            <li data-color="gray"
                                className={'option-gray-title ' + dropDownClass}
                                onClick={this.changeColor}>
                            </li>
                            <li data-color="red"
                                className={'option-red-title ' + dropDownClass}
                                onClick={this.changeColor}>
                            </li>
                            <li data-color="green"
                                className={'option-green-title ' + dropDownClass}
                                onClick={this.changeColor}>
                            </li>
                            <li data-color="purple"
                                className={'option-purple-title ' + dropDownClass}
                                onClick={this.changeColor}>
                            </li>
                        </ul>
                    </div>
                    <span className="note-toolbar-remove" onClick={this.handleRemoveNote.bind(this)}>
                        <FontAwesomeIcon icon="times" />
                    </span>
                </div>
            </div>
        )
    }
}

class ContentNote extends React.Component {

    constructor(props) {
        super(props);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    handleContentChange(e) {
        this.props.onContentChange(e.target.value)
    }

    render() {

        const content = this.props.content;

        return (
            <div>
                <textarea className={'note-content ' + this.props.contentColor} value={content} onChange={this.handleContentChange} />
            </div>
        )
    }
}

class Note extends React.Component {

    render() {
        var contentColor = '';
        switch (this.props.color) {
            case 'red':
                contentColor = 'option-red-content'
                break;
            case 'green':
                contentColor = 'option-green-content'
                break;
            case 'purple':
                contentColor = 'option-purple-content'
                break;
            case 'gray':
                contentColor = 'option-gray-content'
                break;
            default:
                contentColor = 'option-blue-content'
                break;
        }
        return (
            <div className={'note ' + contentColor}>
                <TitleNote id={this.props.note.id}
                    title={this.props.title}
                    date={this.props.note.date}
                    color={this.props.color}
                    onRemoveNoteClick={() => this.props.onRemoveNoteClick()}
                    onTitleChange={this.props.onTitleChange}
                    onColorChange={this.props.onColorChange} />
                <ContentNote content={this.props.content}
                    contentColor={contentColor}
                    onContentChange={this.props.onContentChange} />
            </div>
        )
    }
}

class CreateNote extends React.Component {
    render() {
        return (
            <button className="board-button" onClick={() => this.props.onClick()}><FontAwesomeIcon icon="plus" /></button>
        )
    }
}

class HeaderBoard extends React.Component {
    render() {
        return (
            <div className="board-header">
                <h1 className="board-title">Bienvenido, estas son tus notas.<CreateNote onClick={() => this.props.onClick()} /></h1>
            </div>
        )
    }
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: this.props.notes,
            color: this.props.notes.color,
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    handleClick() {
        const notes = this.state.notes;
        const date = new Date().toLocaleString();
        const newNote = { id: notes.length + 1, title: '', content: '', date: date }
        notes.splice(0, 0, newNote);

        this.setState({
            notes: notes,
        })
    }

    removeNote(index) {
        const notes = this.state.notes;
        notes.splice(index, 1);
        this.setState({
            notes: notes,
        })
    }

    handleTitleChange(index, value) {
        const notes = this.state.notes;

        notes[index].title = value;

        this.setState({
            notes: notes,
        })
    }

    handleContentChange(index, value) {
        const notes = this.state.notes;

        notes[index].content = value;

        this.setState({
            notes: notes,
        })
    }

    changeColor(index, color) {
        const notes = this.state.notes;

        notes[index].color = color;
        this.setState({
            notes: notes,
        })
    }

    render() {

        localStorage.setItem('notes', JSON.stringify(this.state.notes));

        const notes = this.props.notes.map((note, index) => {
            return (
                <Note key={note.id}
                    note={note}
                    title={this.state.notes[index].title}
                    content={this.state.notes[index].content}
                    color={this.state.notes[index].color}
                    onColorChange={this.changeColor.bind(this, index)}
                    onRemoveNoteClick={() => this.removeNote(index)}
                    onTitleChange={this.handleTitleChange.bind(this, index)}
                    onContentChange={this.handleContentChange.bind(this, index)} />
            )
        });
        return (
            <div>
                <HeaderBoard notes={this.props.notes} onClick={() => this.handleClick()} />
                {notes}
            </div>
        )
    }
}

if (!localStorage.getItem('notes')) {
    localStorage.setItem('notes', JSON.stringify([{ id: 1, title: '', content: '', date: new Date().toLocaleString(), color: 'blue' }]))
}

const NOTESLOCAL = JSON.parse(localStorage.getItem('notes'));

ReactDOM.render(<Board notes={NOTESLOCAL} />, document.getElementById('root'));

