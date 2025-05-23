
export const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};



export const cleanHtmlContent = (htmlContent) => {
  const decodedHtml = decodeHtml(htmlContent);

  const cleanedContent = decodedHtml.replace(/(<([^>]+)>)/gi, "");
  return cleanedContent;
};