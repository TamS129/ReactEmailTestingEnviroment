import React, { useEffect, useState } from "react";
import { Body, Text } from "@react-email/components";
import { render } from "@react-email/render";
function EmailBugTest() {
  const [emailHtml, setEmailHtml] = useState("");
  useEffect(() => {
    const EmailComponent = () => (
      <Body style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
        <Text>Email content</Text>
      </Body>
    );
    render(<EmailComponent />,{pretty: true}).then((html) => {
      console.log(html);
      setEmailHtml(html); 
    });
  }, []);
  return (
    <div>
      <h2>Email Bug Test Using React Email's Render Component to HTML (Console)</h2>
      <p>Note: Please demonstrate with and WITHOUT Prettier.</p>
    </div>
  );
}
export default EmailBugTest;