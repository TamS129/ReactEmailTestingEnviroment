import React from 'react';
import { Body, Text } from '@react-email/components'; 
import { renderToString } from 'react-dom/server';

function EmailBugTest() {
  const EmailComponent = () => (
    <> 
      <Body style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        <Text>Hello Everyone</Text> 
        <Text>This is a test... </Text>
        <Text>Please Work...</Text>
      </Body>
    </>
  );

  const emailHtml = renderToString(<EmailComponent />);

  return (
    <div>
      <h2>Email Bug Test</h2>
      <pre>{emailHtml}</pre>
    </div>
  );
}

export default EmailBugTest;