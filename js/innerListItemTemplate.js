export default function listItem (data, height) {
    let template = `
            <div class="imgWrap" style="width: ${height}px;">
                <img src="${data.thumbnailUrl}" />
            </div>
            <div class="listText">${data.title}</div>
    `;

    return template;
}