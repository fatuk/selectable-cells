$(function () {
	var $table = $('#table'),
		$cells = $table.find('td'),
		selectedArray = [],
		$startCell,
		isClicked = false,
		horizontal = false,
		$hoverCell;

	function init() {
		$('body').on('mouseup', function () {
			countSelected();
			selectBetween();
			isClicked = false;
		});

		$cells.on('mousedown', function (e) {
			var $target = $(e.target);
			$startCell = $target;
			isClicked = true;

			resetCells();
			$target.addClass('active');
		});

		$cells.on('mouseup', function (e) {
			var $target = $(e.target);
			$endCell = $target;
			isClicked = false;

			countSelected();
			selectBetween();
		});

		$cells.on('mouseover', function (e) {
			var $target = $(e.target);
			$hoverCell = $target;
			$endCell = $target;

			if (isClicked) {
				selectBetween();
			}
		});

		$('#resetBtn').click(function (e) {
			resetCells();
		});
	}

	function selectBetween() {

		var start = $startCell.data('x'),
			end = $endCell.data('x'),
			y = $startCell.data('y');

		resetCells();

		if ($startCell.data('x') === $hoverCell.data('x')) {
			horizontal = false;
		}
		if ($startCell.data('y') === $hoverCell.data('y')) {
			horizontal = true;
		}

		if (horizontal) {
			// Check horizontal direction
			if ($startCell.data('x') < $endCell.data('x')) {
				for (var i = start; i <= end; i++) {
					$table.find('td[data-x="' + i + '"][data-y="' + y + '"]').addClass('active');
				}
			} else {
				for (var i = end; i <= start; i++) {
					$table.find('td[data-x="' + i + '"][data-y="' + y + '"]').addClass('active');
				}
			}

		} else {
			start = $startCell.data('y');
			end = $endCell.data('y');
			x = $startCell.data('x');

			// Check vertical direction
			if ($startCell.data('y') < $endCell.data('y')) {
				for (var j = start; j <= end; j++) {
					$table.find('td[data-y="' + j + '"][data-x="' + x + '"]').addClass('active');
				}
			} else {
				for (var j = end; j <= start; j++) {
					$table.find('td[data-y="' + j + '"][data-x="' + x + '"]').addClass('active');
				}
			}
		}
	}

	function resetCells() {
		$cells.removeClass('active');
		selectedArray = [];
	}

	function countSelected() {
		$table.find('.active').each(function (index, el) {
			selectedArray.push({
				x: $(el).data('x'),
				y: $(el).data('y')
			});
		});
		console.log(selectedArray);
	}

	init();
});
