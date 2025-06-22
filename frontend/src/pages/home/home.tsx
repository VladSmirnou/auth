import type { FunctionComponent, ReactElement } from 'react';
import { Button } from '../../components/button/button';
import { Container } from '../../components/container/container';
import { Section } from '../../components/section/section';
import {
  useAppDispatch,
  useAppSelector,
} from '../../hooks/typed-react-redux-hooks';
import {
  authModeChanged,
  selectCurrentAuthMode,
} from '../../model/app-slice/app-slice';
import type { AppAuthModes, AuthModes } from '../../model/app-slice/types';
import { not } from '../../shared/utils/not';
import styles from './home.module.css';

const JWTDescription = () => {
  return (
    <Section className={styles.description}>
      <h2>JWT</h2>
      <div>
        <p>
          Access token is stored in memory and received every time the app is
          loaded if refresh token is still valid.
        </p>
        <p>
          Refresh token is stored in cookies with max-age set to 20s. Access
          token lives for 10s, refresh token lives 20s.
        </p>
        <p>
          If access token is expired during a request, then it is re-created and
          the initial request is re-fired again. If refresh token is expired
          then the user is logged out.
        </p>
        <p>
          If user is logged out because refresh token is expired, then the url
          of the page that user was on is stored in memory and if the app is not
          closed, then after a successfull login the user will be redirected to
          this url.
        </p>
        <Section>
          <h3 className={styles.description_todo_title}>TODO:</h3>
          <p>Make a dynamic form component</p>
        </Section>
      </div>
    </Section>
  );
};

const SessionDescription = () => {
  return (
    <Section className={styles.description}>
      <h2>Session</h2>
    </Section>
  );
};

const authModeDescription: Record<AuthModes, FunctionComponent> = {
  JWT: JWTDescription,
  session: SessionDescription,
};

export const Home = () => {
  const dispatch = useAppDispatch();
  const authMode = useAppSelector(selectCurrentAuthMode);

  const handleSetAuthMode = (authMode: AppAuthModes) => {
    dispatch(authModeChanged(authMode));
  };

  let descriptionBlock;
  if (authMode) {
    const Description = authModeDescription[authMode];
    descriptionBlock = (
      <div className={styles.description_block}>
        <Button
          className={styles.reset_auth_mode_button}
          onClick={() => handleSetAuthMode(undefined)}
        >
          Reset auth mode
        </Button>
        <Description />
      </div>
    );
  }

  return (
    <Section>
      <Container>
        <h1 className={styles.title}>Project auth</h1>
        <p>
          In this project I&apos;m going to implement different types of
          authentication and authorization using React, Redux, Next.JS, etc.
        </p>
        {not(descriptionBlock) && (
          <Section>
            <h2>Currently available auth modes</h2>
            <div className={styles.select_auth_mode_buttons_container}>
              <Button onClick={() => handleSetAuthMode('JWT')}>JWT</Button>
              <Button onClick={() => handleSetAuthMode('session')}>
                Session based auth
              </Button>
            </div>
          </Section>
        )}
        {descriptionBlock}
      </Container>
    </Section>
  );
};
