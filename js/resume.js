window.addEventListener('DOMContentLoaded', init);

/*
 * Initialize iframe handling for mobile view
 */
function init() {
    // fallbackLink is inserted into the page when the browser doesn't have built-in PDF-viewing
    let options = {fallbackLink: '<iframe id="resume-iframe"\
     src="https://docs.google.com/viewer?url=https://github.com/joshduo/resume/raw/main/Joshua_Duong_Resume.pdf&embedded=true"\
     title="Web view of Joshua Duong\'s resume through Google Docs Viewer"></iframe>'};
    let iframeTimer;
    
    // Attempt to embed my resume into the page, using fallbackLink if not supported
    PDFObject.embed("Joshua_Duong_Resume.pdf", "#resume-pdf", options);

    // If the browser doesn't have built-in PDF viewing, set reload timer for fallback
    if(!PDFObject.supportsPDFs) {
        document.getElementById('loading').style.display = 'block';
        iframeTimer = setInterval(reloadIFrame, 2000);

        // When the iframe loads, disable the reload timer
        document.getElementById('resume-iframe').addEventListener('load', function() {
            document.getElementById('loading').style.display = 'none';
            clearInterval(iframeTimer);
            console.log("iframe finally loaded");
        })
    }
}

/*
 * Reload the iframe if it doesn't load correctly.
 */
function reloadIFrame() {
    console.log("iframe not loaded. reloading iframe...");
    let iframe = document.getElementById('resume-iframe');

    /*
    if (iframe.contentDocument === null) {
        console.log("url not loaded yet; waiting");
    }
    */

    // If the document has loaded and the iframe page is empty, reload it. 
    if (iframe.contentDocument !== null && iframe.contentDocument.URL === "about:blank") {
        console.log("reloading");
        iframe.src = iframe.src;
    }
}