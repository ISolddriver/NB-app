export function useFetchList (fun: any, query: any) {
  const queryDataFun = fun
  let pagination = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
    showPageSize: true
  })
  const tableData = ref<any[]>([])
  const loading = ref(false)
  const handleSeach = async () => {
    loading.value = true
    const res = await queryDataFun({
      ...query,
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
    loading.value = false
    tableData.value = res.data.list
    pagination.current = res.data.pageNum
    pagination.total = res.data.total
  }

  const handleTableChange = (pageInfo: any) => {
    pagination = Object.assign(pagination, pageInfo)
    handleSeach()
  }

  // onMounted(() => {
  //   handleSeach()
  // })

  return {
    tableData,
    handleTableChange,
    handleSeach,
    pagination,
    loading
  }
}
