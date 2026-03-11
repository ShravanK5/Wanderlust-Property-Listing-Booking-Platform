mapboxgl.accessToken = mapToken;

const el = document.createElement("div");
el.innerHTML = '<i class="fa-solid fa-map-pin"></i>';
el.style.fontSize = "30px";
el.style.color = "red";

const map = new mapboxgl.Map({
    container: "map",
    center: listing.geometry.coordinates,
    zoom: 9
});

new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup( new mapboxgl.Popup({offset:25})
    .setHTML(`<h5>${listing.title}</h5>
        <p>Exact location provided after booking</p>`))
  .addTo(map);


//   new mapboxgl.Marker(el)
//   .setLngLat(listing.geometry.coordinates)
//   .setPopup(
//       new mapboxgl.Popup({ offset: 25 })
//         .setHTML(`
//           <h5>${listing.title}</h5>
//           <p>Exact location provided after booking</p>
//         `)
//   )
//   .addTo(map);