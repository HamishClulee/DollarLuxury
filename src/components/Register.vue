<template>
    <div class="box">
        <div class="help is-danger box" v-if="error">
            <p>There was an error, unable to complete registration.</p>
        </div>
        <div class="help is-primary box" v-if="success">
            <p>Registration completed. You can now sign in.</p>
        </div>
        <div>
            <div class="field">
                <label class="label">First Name</label>
                <input type="email" id="email" class="input" v-model="user.firstName" required>
            </div>
            <div class="field">
                <label class="label">Last Name</label>
                <input type="email" id="email" class="input" v-model="user.lastName" required>

            </div>
            <div class="field">
                <label class="label">Address</label>
                <input type="email" id="email" class="input" v-model="user.address" required>

            </div>
            <div class="field">
                <label class="label">UserName</label>
                <input type="email" id="email" class="input" placeholder="UserName" v-model="user.username" required>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <input type="password" id="password" class="input" v-model="user.password" required>
            </div>
            <p class="control">
                <button type="submit" class="button is-primary add-margin" @click="register">Submit</button>
            </p>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            user: {
                // server domain values
                username: null,
                firstName: null,
                lastName: null,
                address: null,
                password: null
            },
            success: false,
            error: false,
            response: null
        }
    },
    methods: {
        register(event) {
            event.preventDefault();
            auth.register(this, this.user);
        }
    }
}
</script>

<style scoped>

.add-margin {
    margin: 20px;
}

</style>