<?php
    require __DIR__ . "/model.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <header>
        <h2>Header</h2>
    </header>
    <ul>
        <?php foreach (getItems(1, 4) as $item): ?>
            <li>
                <img src="<?php echo $item['img']; ?>" alt="<?php echo $item['title']; ?>">
                <?php echo $item['title']; ?>
                <?php echo $item['description']; ?>
                <?php echo $item['discountCost'] ? $item['discountCost'] : $item['cost']; ?>
                <?php if ($item['discountCost'] !== null): ?>
                    <?php echo $item['cost']; ?>
                    Sale
                <?php endif; ?>
                <?php if ($item['new']): ?>
                    New
                <?php endif; ?>
            </li>
        <?php endforeach; ?>
    </ul>
    <button>Load more</button>
    <footer>
        <h2>Footer</h2>
    </footer>
</body>
</html>