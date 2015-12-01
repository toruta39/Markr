export default function(textObj) {
  let color = textObj.font.colors[0]
    .map((c, i) => i === 3 ? (c / 255).toFixed(2) : c)
    .join(',');

  color = `rgba(${color})`;

  let rules = [
    `font-family: "${textObj.font.name}";`,
    `font-size: ${textObj.font.sizes[0]}px;`,
    `color: ${color};`
  ];

  if (textObj.font.leadings.length) {
    rules.push(`line-height: ${textObj.font.leadings[0]}px;`);
  }

  return rules.join('\n');
}
