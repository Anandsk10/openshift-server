import React from "react";

const Report = () => {
  return (
    <div style={{ marginTop: 60 }}>
      <iframe
        title="Server Management"
        alignSelf="center"
        width="100%"
        height={650}
        src="https://app.powerbi.com/reportEmbed?reportId=a69c6aa3-030a-4557-acae-6adbf10b78c7&autoAuth=true&ctid=3dd8961f-e488-4e60-8e11-a82d994e183d&filterPaneEnabled=false&navContentPaneEnabled=false"
        frameborder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Report;
