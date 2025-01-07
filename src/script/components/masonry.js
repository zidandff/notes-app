const masonryGrid = new Masonry('.notes-list', {
  itemSelector: '.note',
  percentPosition: true,
  gutter: 8,
  horizontalOrder: true,
});

export default masonryGrid;