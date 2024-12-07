<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        class="custom-table"
        flat
        bordered
        :rows="accounts"
        :columns="columns"
        row-key="id"
        :loading="loading"
        :rows-per-page-options="[10, 20, 50]"
        separator="cell"
      >
        <template v-slot:top>
          <div class="text-h6">Chi tiết tài khoản</div>
          <q-space />
          <q-btn
            color="positive"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
          />
        </template>

        <!-- Copy button for username -->
        <template v-slot:body-cell-username="props">
          <q-td :props="props">
            <div class="row items-center">
              {{ props.value }}
              <q-space />
              <q-btn
                flat
                round
                dense
                icon="content_copy"
                color="primary"
                @click="copyToClipboard(props.value)"
              >
                <q-tooltip>Copy username</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>

        <!-- Copy button for password -->
        <template v-slot:body-cell-password="props">
          <q-td :props="props">
            <div class="row items-center">
              <span class="text-password">{{ props.value }}</span>
              <q-space />
              <q-btn
                flat
                round
                dense
                icon="content_copy"
                color="primary"
                @click="copyToClipboard(props.value)"
              >
                <q-tooltip>Copy password</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>

        <!-- Copy button for spc_f -->
        <template v-slot:body-cell-spc_f="props">
          <q-td :props="props">
            <div class="row items-center text-password">
              <q-scroll-area visible style="min-width: 300px; height: 36px">
                {{ props.value }}
              </q-scroll-area>
              <q-space />
              <q-btn
                v-if="props.value"
                flat
                round
                dense
                icon="content_copy"
                color="primary"
                @click="copyToClipboard(props.value)"
              >
                <q-tooltip>Copy SPC_F</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>

        <!-- Copy button for cookie -->
        <template v-slot:body-cell-cookie="props">
          <q-td :props="props">
            <div class="row items-center text-password">
              <q-scroll-area visible style="min-width: 300px; height: 36px">
                {{ props.value }}
              </q-scroll-area>
              <q-space />
              <q-btn
                class="q-ml-md"
                v-if="props.value"
                flat
                round
                dense
                icon="content_copy"
                color="primary"
                @click="copyToClipboard(props.value)"
              >
                <q-tooltip>Copy SPC_F</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { exportFile } from "quasar";
import { useRoute } from "vue-router";
import { showNotification } from "src/utils/AppUtils";
import ApiDetailAccount from "src/services/ApiDetailAccount";
import { useAuthStore } from "src/store/AuthStore";

const route = useRoute();
const loading = ref(false);
const accounts = ref([]);
const authStore = useAuthStore();

const columns = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "username",
    align: "left",
    label: "Username",
    field: "username",
    sortable: true,
  },
  {
    name: "spc_f",
    align: "left",
    label: "SPC_F",
    field: "spc_f",
  },
  {
    name: "password",
    align: "left",
    label: "Password",
    field: "password",
  },
  {
    name: "cookie",
    align: "left",
    label: "Cookie",
    field: "cookie",
  },
];

const fetchAccountDetails = async () => {
  try {
    loading.value = true;
    const orderId = route.params.id;
    const response = await ApiDetailAccount.getDetailAccountByOrderIdAndUserId(
      orderId,
      authStore.id,
      1,
      100
    );
    if (response.statusCode === 200) {
      accounts.value = response.data;
    } else {
      showNotification(response.message, false);
    }
  } catch (error) {
    showNotification("Error loading account details: " + error.message, false);
  } finally {
    loading.value = false;
  }
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    showNotification("Copied to clipboard!", true);
  } catch (err) {
    showNotification("Failed to copy text", false);
  }
};

onMounted(() => {
  fetchAccountDetails();
});

const wrapCsvValue = (val, formatFn, row) => {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
};

const exportTable = () => {
  // naive encoding to csv format
  const content = [columns.map((col) => wrapCsvValue(col.label))]
    .concat(
      accounts.value.map((row) =>
        columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === "function"
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row
            )
          )
          .join(",")
      )
    )
    .join("\r\n");

  const status = exportFile(
    `export_account_${new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/:/g, "-")}.csv`,
    content,
    "text/csv"
  );

  if (!status) {
    showNotification("Lỗi khi xuất file!", false);
  }
};
</script>

<style lang="sass">
.text-password
  font-family: monospace
  letter-spacing: 1px
</style>
