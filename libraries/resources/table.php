<table class="table">
    <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
    </tr>
    </thead>
    <tbody>

    <?php
        require_once 'app/database/config2.php';
        include('app/Queries/queries.php');
        if ($result = $pdo->query($queries_indicator['api/selectQueries'])) {
            if ($result->rowCount() > 0) {
                while ($row = $result->fetch()) {
    ?>

    <tr>
        <th scope="row"><?php echo $row['id']; ?></th>
        <td><?php echo $row['data1']; ?></td>
        <td><?php echo $row['created_at']; ?></td>
        <td>
            <button class="btn btn-primary" onclick="onedit(<?php echo $row['id']; ?>)">Edit</button>
            <button class="btn btn-danger" onclick="ondelete(<?php echo $row['id']; ?>)">Delete</button>
        </td>
    </tr>

    <?php
                }
                unset($result);
            }
        }
    ?>

    </tbody>
</table>