/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// CREDITS //////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default class CreditsScene extends Phaser.Scene {
    constructor () {
        super({key: 'CreditsScene'});
    }

    create() {
    currentScene = this;
    // SOUNDS
        this.music = this.sound.add('secondaryMusic', musicConfig);
        this.clickSound = this.sound.add('clickSound');

        if (musicEnabled){
            this.music.play();
        }

    //IMAGES
        this.grid = this.add.image(centerX, centerY, 'grid');

        this.title = this.add.image(centerX, 210, 'creditsTitle');
        this.title.setScale(0.7);

        this.logo = this.add.image(centerX, centerY + 300, 'logo');
        this.logo.setScale(1);

        this.credits = this.add.image(centerX, centerY, 'creditsNames');
        this.credits.setScale(0.7);

    // BUTTONS
        // Exit
        this.exitButton = this.add.image(100, 100, 'exitDefault');

    // PLAYERS CREATION
        player1 = this.physics.add.image(centerX-300, centerY, 'wheel');//.setInteractive();
        player2 = this.physics.add.image(centerX+300, centerY, 'moon');//.setInteractive();

        // Collision with world bounds
        player1.setCollideWorldBounds(true);
        player2.setCollideWorldBounds(true);

        // CONTROLS OF PLAYERS
        // PLayer 1 is controlled with WASD and interacts with SPACE
        p1Ctrls = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'interact': Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        // To avoid player 1 automatic movement after returning to this scene 
        //(because it uses WASD)
        this.p1ctrlsReset();
    }


    update() {

        if(assignedPlayer == 1){
            movementHandler(player1, player2);
            handleButtonInteraction(this.exitButton, 'StartScene', player1, player2, this);
        }else if( assignedPlayer == 2){
            movementHandler(player2, player1);
            handleButtonInteraction(this.exitButton, 'StartScene', player2, player1, this);
        }

        /*
        // Assigns p1ctrls as controls for player1
        this.handlePlayerMovement(player1, p1Ctrls);
        // Assigns p2ctrls as controls for player2
        this.handlePlayerMovement(player2, p2Ctrls);

        // Interaction with Exit button
        this.handleButtonInteraction(this.exitButton, 'StartScene', p1Ctrls.interact);
        this.handleButtonInteraction(this.exitButton, 'StartScene', p2Ctrls.interact);
        */
    }

    shutdown(){}

    // Resets controls of player 1
    p1ctrlsReset() {
        p1Ctrls.up.reset();
        p1Ctrls.down.reset();
        p1Ctrls.left.reset();
        p1Ctrls.right.reset();
        p1Ctrls.interact.reset();
    }

    /*
    // Detects if key in input is pressed to move player
    handlePlayerMovement(player, input) {
        if (input.left.isDown) {
            player.setVelocityX(-PLAYER_SPEED);
        } else if (input.right.isDown) {
            player.setVelocityX(PLAYER_SPEED);
        } else {
            player.setVelocityX(0);
        }

        if (input.up.isDown) {
            player.setVelocityY(-PLAYER_SPEED);
        } else if (input.down.isDown) {
            player.setVelocityY(PLAYER_SPEED);
        } else {
            player.setVelocityY(0);
        }
    }*/
    /*
    // Detects if player interacts with the button to start another scene
    handleButtonInteraction(button, targetScene, interactKey) {
        p1Bounds = player1.getBounds();
        p2Bounds = player2.getBounds();
        buttonBounds = button.getBounds();

        //If bounds of any player and the button intersect
        if (Phaser.Geom.Intersects.RectangleToRectangle(p1Bounds, buttonBounds) ||
            Phaser.Geom.Intersects.RectangleToRectangle(p2Bounds, buttonBounds)) {
            
            //Changes button texture to hover
            button.setTexture(`${button.texture.key.replace('Default', 'Hover')}`);
                
            //Changes scene if key down and plays sound
            if (interactKey.isDown) {
                //Check cooldown of player of this interact key
                if (interactKey = p1Ctrls.interact)
                {
                    //Cooldown time of player 1 passsed
                    if(checkCooldown(player1)){
                        this.sceneChange(targetScene);
                    }
                }else if (interactKey = p2Ctrls.interact)
                {
                    //Cooldown time of player 2 passed
                    if(checkCooldown(player2)){
                        this.sceneChange(targetScene);
                    }
                }
            }
        } else {
            //Maintains normal texture of button
            button.setTexture(button.texture.key.replace('Hover', 'Default'));
        }
    }*/
}