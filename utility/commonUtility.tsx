export const getImageURL = (url: string, type: 'square'|'land') => {
  return url ? url : `/images/default-${type}.png`;
}

export const getAuthor = (author: string, source: string) => {
    return author ? author : source;
}

export const setDefaultImageOnError = (event: any, type: 'square'|'land') => {
    const defaultUrl = `/images/default-${type}.png`;
    (event.target.src !== defaultUrl) && (event.target.src = defaultUrl);
}

export const setNewsDataToLS = async (data: any) => {
    localStorage.setItem('newsData', JSON.stringify(data));
}

export const getNewsDataFromLS = () => {
    return JSON.parse(localStorage.getItem('newsData') || '{}');
}

export const getImageDefaultURL = (url: string, type: 'square'|'land') => {
    const defaultUrlSq = `/images/default-square.png`;
    const defaultUrlLand = `/images/default-land.png`;
    const constructedDefaultUrl = `/images/default-${type}.png`;
    const isDefaultUrl = url === defaultUrlSq || url === defaultUrlLand;
    return isDefaultUrl ? constructedDefaultUrl : url;
}