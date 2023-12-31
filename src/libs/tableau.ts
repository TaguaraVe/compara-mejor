import { TableauEventType } from 'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.js';
// TableauEventType represents the type of Tableau embedding event that can be listened for.
// List of visualizations to cycle through.
const vizList = [
  'https://prod-useast-a.online.tableau.com/#/site/jml2/views/2023-7-20comparamejorsql/Home?:origin=card_share_link&:embed=n',
  'https://prod-useast-a.online.tableau.com/#/site/jml2/views/2023-7-20comparamejorsql/ComparadordeCatalogo?:origin=card_share_link&:embed=n',
  'https://prod-useast-a.online.tableau.com/#/site/jml2/views/2023-7-20comparamejorsql/ComparadordePrecios?:origin=card_share_link&:embed=n',
];

let vizLen = vizList.length,
  vizCount = 0;
let token: string | null = null;

async function getToken() {
  const apiUrl = 'https://tableau-token-generator.vercel.app/token';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();

    function handleFirstInteractive(e) {
      console.log(`Viz loaded: ${viz.src}`);
    }

    // Determine the correct visualization to display.
    function loadViz(vizPlusMinus) {
      vizCount = vizCount + vizPlusMinus;

      if (vizCount >= vizLen) {
        // Keep the vizCount in the bounds of the array index.
        vizCount = 0;
      } else if (vizCount < 0) {
        vizCount = vizLen - 1;
      }

      viz.src = vizList[vizCount];
    }

    let viz = document.getElementById('tableauViz');

    // Event fired when a viz first becomes interactive.
    viz.addEventListener(
      TableauEventType.FirstInteractive,
      handleFirstInteractive
    );
    viz.src = vizList[0];
    viz.id = '6b94cee6-0733-456a-af57-e84176d41180';
    viz.token = data.token;

    // Attach event handlers to the "previous" and "next" button clicks.
    document.getElementById('previous').onclick = () => loadViz(-1);
    document.getElementById('next').onclick = () => loadViz(1);
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
  }
}
getToken();
setInterval(() => {
  getToken();
}, 1 * 60 * 1000);

export async function getTableaToken() {
  const apiUrl = 'https://tableau-token-generator.vercel.app/token';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
  }
}
