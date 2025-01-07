const masonryGrid = new Masonry('.notes-list', {
  itemSelector: '.note',
  percentPosition: true,
  gutter: 8,
});

export default masonryGrid;