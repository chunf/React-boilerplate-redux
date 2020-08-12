import React from "react";

import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
} from "@elastic/eui";

export default () => (
  <EuiPageContent>
    <EuiPageContentHeader>
      <EuiPageContentHeaderSection>
        <EuiTitle>
          <h2>Content title</h2>
        </EuiTitle>
      </EuiPageContentHeaderSection>
    </EuiPageContentHeader>
    <EuiPageContentBody>Content body</EuiPageContentBody>
  </EuiPageContent>
);
