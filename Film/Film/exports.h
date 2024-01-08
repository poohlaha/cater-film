// 导出 Rust 函数
#include <stdint.h>

typedef struct {
    char *name;
    char *class;
    char *area;
    char *lang;
    char *year;
    char *sort;
    uint64_t page;
    char *tid;
    char *text;
} COrder;

const char* handle(const char *name, const COrder *order);
void free_c_order(COrder *c_order);
