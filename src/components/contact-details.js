import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { connect } from 'react-redux';
import uuid from 'react-uuid';
import AddCircle from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Virtualise from './virtualise';
import {
  fetchCompanies, addCompany, renameContributor, increaseCompanyTally, addComment, resetSession,
} from '../actions';

const ContactDetails = (props) => {
  const {
    all,
    companies,
    contributor,
    fetchCompaniesFromServer,
    addCompanyToState,
    changeAuthor,
    increaseTallyInServer,
    saveComment,
    resetSessionState,
  } = props;
  const history = useHistory();
  const [comments, setComments] = useImmer({});

  useEffect(() => {
    fetchCompaniesFromServer();
  }, [fetchCompaniesFromServer]);

  const options = all.map((company) => company.name);

  const renderBoxes = companies.map((name, i) => (
    <div key={uuid()} style={{ marginBottom: '10px' }}>
      <Virtualise
        value={name}
        options={options}
        label="add a company"
        onChange={(_, v) => {
          addCompanyToState(i, v);
          if (v != null) {
            setComments((draft) => {
              draft[v] = {
                recruitingFor: '',
                text: '',
              };
            });
          }
        }}
      />
    </div>
  ));

  const renderCommentBoxes = companies.map((name) => {
    if (name !== null) {
      if (comments[name] === undefined) {
        setComments((draft) => {
          draft[name] = {
            recruitingFor: '',
            text: '',
          };
        });
      }
      return (
        <div key={name}>
          <h4 style={{ textAlign: 'center' }}>{name}</h4>
          <ol>
            <li>
              <p>What kind of role were you contacted about?</p>
              <RadioGroup
                aria-label="contacType"
                name="contact-type"
                onChange={(_, v) => {
                  setComments((draft) => {
                    draft[name].recruitingFor = v;
                  });
                }}
                value={comments[name] ? comments[name].recruitingFor : ''}
              >
                <FormControlLabel value="Internship" control={<Radio />} label="Internship" />
                <FormControlLabel value="New grad" control={<Radio />} label="New grad" />
                <FormControlLabel value="Experienced" control={<Radio />} label="Experienced" />
              </RadioGroup>
            </li>
            <li>
              <p>
                Add any additional details. E.g the date you were contacted or the type of communication request, such
                as an online assessment or phone interview.
              </p>
              <TextareaAutosize
                aria-label="text"
                rowsMin={5}
                style={{
                  fontFamily: '\'Roboto\', sans-serif',
                  fontSize: '15px',
                  lineHeight: '25px',
                  width: '80%',
                }}
                value={comments[name] ? comments[name].text : ''}
                onChange={(e) => {
                  setComments((draft) => {
                    draft[name].text = e.target.value;
                  });
                }}
              />
            </li>
          </ol>
        </div>
      );
    }
    return null;
  });

  return (
    <div
      id="contact-details"
    >
      <Card style={{ marginBottom: '15px', marginTop: '15px' }}>
        <p style={{ padding: '10px' }}>
          Hi! Welcome to this year&apos;s crowdsourced information about companies reaching out through the resume
          database. You can check out last year&apos;s results to see the final tallies
          {' '}
          <a style={{ textDecoration: 'none' }} href="https://hackheart.pythonanywhere.com/">here</a>
          . There were so many contributions and thank you to everyone who contributed! Now for this year. If you
          have a company to report, keep scrolling. If you don&apos;t have any, you can proceed to the results.
          But please come back when a company reaches out. We&apos;re all counting on each other to stay in the loop,
          and there won&apos;t be any data if you don&apos;t contribute.
          <br />
          <br />
          Btw, if you&apos;re wondering where the resume database is, it&apos;s
          {' '}
          <a style={{ textDecoration: 'none' }} href="https://careercenter.anitab.org/resume/upload/">here</a>
          .
        </p>
      </Card>
      <Card style={{ marginBottom: '15px' }}>
        <h2 style={{ padding: '10px', textAlign: 'center' }}>Submission Form</h2>
        <p style={{ padding: '10px' }}>
          First of all, thank you for contributing to this! It&apos;ll take as much time as you&apos;re willing to give.
          You are not obliged to fill out all the details, but even something as short as &quot;recruiter called&quot;
          in the details section could be helpful. However, just adding the name of the company counts!
          This list is a tentative list of companies attending based on 2019 sponsors, but it is NOT official.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AddCircle style={{ color: '#00ff00', cursor: 'pointer', marginBottom: '5px' }}
            onClick={() => {
              addCompanyToState(companies.length, null);
            }}
          />
          {renderBoxes}
        </div>
      </Card>
      <Card>
        <h2 style={{ padding: '10px', textAlign: 'center' }}>Additional Details (optional)</h2>
        <div style={{ padding: '5px' }}>
          <p>
            This name will show up with any additional details. Leave it blank to have the details saved under
            anonymous. You can also use a nickname in case you&apos;re interested in finding your comments later.
          </p>
          <TextField value={contributor}
            label="Contributor name"
            variant="outlined"
            onChange={(event) => { changeAuthor(event.target.value); }}
          />
          <h3 style={{ padding: '10px', textAlign: 'center' }}>Company Details</h3>
          {renderCommentBoxes}
        </div>
      </Card>
      <Button
        color="primary"
        variant="contained"
        style={{ marginTop: '15px' }}
        onClick={() => {
          increaseTallyInServer();
          Object.keys(comments).forEach((key) => {
            if (companies.includes(key) && comments[key] !== {
              recruitingFor: '',
              text: '',
            }) {
              saveComment(key, { author: contributor, ...comments[key] });
            }
          });
          resetSessionState();
          history.push('/results');
        }}
      >
        Submit

      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  all: state.companies.all,
  companies: state.session.companies,
  contributor: state.session.contributor,
});

export default connect(mapStateToProps, {
  fetchCompaniesFromServer: fetchCompanies,
  addCompanyToState: addCompany,
  changeAuthor: renameContributor,
  increaseTallyInServer: increaseCompanyTally,
  saveComment: addComment,
  resetSessionState: resetSession,
})(ContactDetails);
