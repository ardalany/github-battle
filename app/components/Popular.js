import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../utils/api.js';

export default class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    render() {

        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    OnSelect={this.updateLanguage} />
                    {this.repos}
                    {(this.state.repos == null) ? <p>LOADING ... </p> : <RepoGrid repos={this.state.repos} />}
            </div>
        )
    }

    updateLanguage(language) {
        this.setState(() => ({ selectedLanguage: language }));

        api.fetchPopularRepos(language)
            .then((repos) => {
                this.setState(() => ({ repos: repos }))
            });
    }
}

function SelectLanguage(props) {
    var languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python", "C#"];

    return (<ul className="languages">
        {
            languages.map(language => {
                return (
                    <li
                        style={(language === props.selectedLanguage) ? { color: '#d0021b' } : null}
                        key={language}
                        onClick={props.OnSelect.bind(null, language)}>{language}</li>
                );
            })
        }
    </ul>
    );
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    OnSelect: PropTypes.func.isRequired
}

function RepoGrid(props) {
    return (
        <ul className='popular-list'>
            {props.repos.map((repo, index) => {
                return (
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img
                                    className='avatar'
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for ' + repo.owner.login} />
                            </li>
                            <li>
                                <a 
                                href={repo.html_url}
                                target="_blank">{repo.name}</a>
                            </li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}