import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./MapMAPBOX'), {
  ssr: false
});
// const Map = dynamic(() => import('./Map'), {
//   ssr: false
// });

export default Map;