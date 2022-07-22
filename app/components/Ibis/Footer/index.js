import React from 'react';
import { FormattedMessage } from 'react-intl';

// eslint-disable-next-line import/no-unresolved
import LocaleToggle from 'containers/LocaleToggle';
import A from '../A';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <FormattedMessage {...messages.licenseMessage} />
      </section>
      <section>
        <LocaleToggle />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <A href="https://twitter.com/mxstbr">Max Stoiber</A>,
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
